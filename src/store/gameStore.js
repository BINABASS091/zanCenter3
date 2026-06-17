import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { achievements as achievementCatalog, missions as missionCatalog, buildingCatalog } from '../data/sampleData'
import {
  calculateIslandStats,
  evaluateAchievements,
  evaluateMissionCompletion,
  createPlacedBuilding,
  findNearestFreeSlot,
  filterMissionsByAgeMode,
  DEFAULT_STATS,
} from '../utils/gameLogic'
import { canClaimDailyReward, DAILY_REWARD } from '../services/progressionService'

const getInitialMissions = (ageMode = 'creator') =>
  filterMissionsByAgeMode(missionCatalog, ageMode).map((mission) => ({ ...mission, completed: false }))

const getInitialState = () => ({
  ...DEFAULT_STATS,
  gold: 500,
  xp: 0,
  level: 1,
  totalXP: 0,
  buildings: [],
  activeMissions: getInitialMissions('creator'),
  completedMissions: [],
  unlockedAchievements: [],
  totalAchievements: achievementCatalog,
  userName: 'Explorer',
  userType: 'child',
  ageMode: null,
  onboardingComplete: false,
  learningStreak: 0,
  lastDailyRewardDate: null,
  lastActiveDate: null,
  reactCourseProgress: {},
  unlockedZones: ['beach'],
  exploredZones: [],
  completedMiniGames: [],
  lastSavedAt: null,
})

const withProgression = (state) => {
  const stats = calculateIslandStats(state.buildings)
  const evaluatedMissions = evaluateMissionCompletion(state.activeMissions, state.buildings, stats)
  const newlyCompletedMissions = evaluatedMissions.filter(
    (mission) => mission.completed && !state.completedMissions.some((existing) => existing.id === mission.id)
  )

  const missionRewards = newlyCompletedMissions.reduce((sum, mission) => sum + (mission.reward || 0), 0)
  const missionXP = newlyCompletedMissions.reduce((sum, mission) => sum + (mission.xp || 0), 0)
  const newTotalXP = state.totalXP + missionXP
  const newLevel = Math.floor(newTotalXP / 1000) + 1

  const evaluatedAchievements = evaluateAchievements({
    buildings: state.buildings,
    stats,
    level: newLevel,
    completedMissions: [...state.completedMissions, ...newlyCompletedMissions],
  })
  const unlockedAchievements = evaluatedAchievements.filter((ach) => ach.unlocked)

  return {
    ...state,
    ...stats,
    level: newLevel,
    xp: newTotalXP % 1000,
    totalXP: newTotalXP,
    activeMissions: evaluatedMissions,
    completedMissions: [...state.completedMissions, ...newlyCompletedMissions],
    unlockedAchievements,
    gold: state.gold + missionRewards,
    lastSavedAt: new Date().toISOString(),
  }
}

const trackStreak = (state) => {
  const today = new Date().toDateString()
  const last = state.lastActiveDate
  if (!last) return { learningStreak: 1, lastActiveDate: today }
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  if (last === today) return {}
  if (last === yesterday.toDateString()) return { learningStreak: state.learningStreak + 1, lastActiveDate: today }
  return { learningStreak: 1, lastActiveDate: today }
}

export const useGameStore = create(
  persist(
    (set, get) => ({
      ...getInitialState(),

      resetGame: () => set(() => getInitialState()),

      placeBuilding: (buildingDefinition, position) => set((state) => {
        if (state.gold < buildingDefinition.cost) return state
        const snappedPos = findNearestFreeSlot(position, state.buildings)
        const placedBuilding = createPlacedBuilding(buildingDefinition, snappedPos)
        const nextState = {
          ...state,
          gold: state.gold - buildingDefinition.cost,
          buildings: [...state.buildings, placedBuilding],
        }
        return withProgression({ ...nextState, ...trackStreak(state) })
      }),

      upgradeBuilding: (buildingId) => set((state) => {
        const building = state.buildings.find((b) => b.id === buildingId)
        if (!building) return state
        const catalog = buildingCatalog.find((b) => b.type === building.type)
        const maxLevel = catalog?.maxLevel || 3
        const currentLevel = building.level || 1
        if (currentLevel >= maxLevel) return state
        const upgradeCost = catalog?.upgradeCost || 100
        if (state.gold < upgradeCost) return state

        const updatedBuildings = state.buildings.map((b) =>
          b.id === buildingId ? { ...b, level: currentLevel + 1 } : b
        )
        return withProgression({
          ...state,
          gold: state.gold - upgradeCost,
          buildings: updatedBuildings,
          ...trackStreak(state),
        })
      }),

      moveBuilding: (buildingId, position) => set((state) => {
        const snappedPos = findNearestFreeSlot(position, state.buildings, buildingId)
        const updatedBuildings = state.buildings.map((building) =>
          building.id === buildingId ? { ...building, position: snappedPos } : building
        )
        return withProgression({ ...state, buildings: updatedBuildings })
      }),

      removeBuilding: (buildingId) => set((state) => {
        const nextBuildings = state.buildings.filter((building) => building.id !== buildingId)
        return withProgression({ ...state, buildings: nextBuildings })
      }),

      addXP: (amount) => set((state) => withProgression({
        ...state,
        totalXP: state.totalXP + amount,
        ...trackStreak(state),
      })),

      addGold: (amount) => set((state) => withProgression({
        ...state,
        gold: state.gold + amount,
      })),

      updateStats: (stats) => set((state) => withProgression({ ...state, ...stats })),

      completeMission: (missionId) => set((state) => {
        const mission = state.activeMissions.find((item) => item.id === missionId)
        if (!mission || state.completedMissions.some((item) => item.id === missionId)) return state
        const nextState = {
          ...state,
          activeMissions: state.activeMissions.map((item) =>
            item.id === missionId ? { ...item, completed: true } : item
          ),
          completedMissions: [...state.completedMissions, { ...mission, completed: true }],
          gold: state.gold + (mission.reward || 0),
          totalXP: state.totalXP + (mission.xp || 0),
        }
        return withProgression({ ...nextState, ...trackStreak(state) })
      }),

      claimDailyReward: () => set((state) => {
        if (!canClaimDailyReward(state.lastDailyRewardDate)) return state
        const today = new Date().toDateString()
        return withProgression({
          ...state,
          gold: state.gold + DAILY_REWARD.gold,
          totalXP: state.totalXP + DAILY_REWARD.xp,
          lastDailyRewardDate: today,
          ...trackStreak(state),
        })
      }),

      setAgeMode: (mode) => set((state) => ({
        ...state,
        ageMode: mode,
        activeMissions: getInitialMissions(mode).map((mission) => {
          const existing = state.activeMissions.find((m) => m.id === mission.id)
          return existing || mission
        }),
        lastSavedAt: new Date().toISOString(),
      })),

      completeOnboarding: ({ userName, ageMode }) => set((state) => ({
        ...state,
        userName: userName || state.userName,
        ageMode: ageMode || state.ageMode || 'creator',
        onboardingComplete: true,
        activeMissions: getInitialMissions(ageMode || 'creator'),
        lastSavedAt: new Date().toISOString(),
        ...trackStreak(state),
      })),

      unlockAchievement: (achievement) => set((state) => {
        const exists = state.unlockedAchievements.some((item) => item.id === achievement.id)
        if (exists) return state
        return {
          ...state,
          unlockedAchievements: [...state.unlockedAchievements, achievement],
          lastSavedAt: new Date().toISOString(),
        }
      }),

      setUserInfo: (info) => set((state) => ({
        ...state,
        ...info,
        lastSavedAt: new Date().toISOString(),
      })),

      completeReactLesson: (lessonId, xpReward = 100) => set((state) => {
        if (state.reactCourseProgress[lessonId]?.completed) return state
        return withProgression({
          ...state,
          reactCourseProgress: {
            ...state.reactCourseProgress,
            [lessonId]: { completed: true, completedAt: new Date().toISOString() },
          },
          totalXP: state.totalXP + xpReward,
          ...trackStreak(state),
        })
      }),

      exploreZone: (zoneId, reward = 50) => set((state) => {
        if (state.exploredZones.includes(zoneId)) return state
        const newUnlocked = [...state.unlockedZones]
        return withProgression({
          ...state,
          exploredZones: [...state.exploredZones, zoneId],
          gold: state.gold + reward,
          totalXP: state.totalXP + reward,
          unlockedZones: newUnlocked,
          ...trackStreak(state),
        })
      }),

      unlockZone: (zoneId) => set((state) => ({
        ...state,
        unlockedZones: state.unlockedZones.includes(zoneId)
          ? state.unlockedZones
          : [...state.unlockedZones, zoneId],
      })),

      completeMiniGame: (gameId, xpReward = 100) => set((state) => {
        if (state.completedMiniGames.includes(gameId)) return state
        return withProgression({
          ...state,
          completedMiniGames: [...state.completedMiniGames, gameId],
          totalXP: state.totalXP + xpReward,
          gold: state.gold + Math.floor(xpReward / 2),
          ...trackStreak(state),
        })
      }),

      hydrateProgress: () => set((state) => {
        let onboardingComplete = state.onboardingComplete
        let ageMode = state.ageMode
        if (!onboardingComplete && (state.buildings?.length > 0 || state.totalXP > 0)) {
          onboardingComplete = true
          if (!ageMode) ageMode = 'creator'
        }
        return withProgression({
          ...state,
          onboardingComplete,
          ageMode,
        })
      }),
    }),
    {
      name: 'zanzibar-center-progress',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        energy: state.energy,
        food: state.food,
        happiness: state.happiness,
        population: state.population,
        environment: state.environment,
        innovation: state.innovation,
        gold: state.gold,
        xp: state.xp,
        level: state.level,
        totalXP: state.totalXP,
        buildings: state.buildings,
        activeMissions: state.activeMissions,
        completedMissions: state.completedMissions,
        unlockedAchievements: state.unlockedAchievements,
        userName: state.userName,
        userType: state.userType,
        ageMode: state.ageMode,
        onboardingComplete: state.onboardingComplete,
        learningStreak: state.learningStreak,
        lastDailyRewardDate: state.lastDailyRewardDate,
        lastActiveDate: state.lastActiveDate,
        reactCourseProgress: state.reactCourseProgress,
        unlockedZones: state.unlockedZones,
        exploredZones: state.exploredZones,
        completedMiniGames: state.completedMiniGames,
        lastSavedAt: state.lastSavedAt,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrateProgress?.()
        }
      },
    }
  )
)

export const useUIStore = create((set) => ({
  currentPage: 'landing',
  navigation: 'landing',
  showAICoach: false,
  showAchievementModal: false,
  selectedAchievement: null,
  showMissionDetails: false,
  selectedMission: null,
  sidebarOpen: true,
  modals: {},
  isLoading: false,
  notifications: [],

  setCurrentPage: (page) => set({ currentPage: page }),
  setNavigation: (nav) => set({ navigation: nav }),
  toggleAICoach: () => set((state) => ({ showAICoach: !state.showAICoach })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openAchievementModal: (achievement) => set({ showAchievementModal: true, selectedAchievement: achievement }),
  closeAchievementModal: () => set({ showAchievementModal: false, selectedAchievement: null }),
  toggleAchievementModal: () => set((state) => ({ showAchievementModal: !state.showAchievementModal })),
  openMissionDetails: (mission) => set({ showMissionDetails: true, selectedMission: mission }),
  closeMissionDetails: () => set({ showMissionDetails: false, selectedMission: null }),
  openModal: (modalName, data) => set((state) => ({ modals: { ...state.modals, [modalName]: data } })),
  closeModal: (modalName) => set((state) => {
    const { [modalName]: _, ...rest } = state.modals
    return { modals: rest }
  }),
  setLoading: (isLoading) => set({ isLoading }),
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { ...notification, id: Date.now() }],
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id),
  })),
}))
