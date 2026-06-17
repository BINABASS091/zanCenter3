export const theme = {
  colors: {
    ocean: {
      deep: '#07121F',
      surface: '#0B1320',
    },
    island: {
      blue: '#00D4FF',
      green: '#2EE59D',
    },
    sun: {
      golden: '#FFCC00',
    },
    alert: {
      coral: '#FF5C5C',
    },
    text: {
      white: '#FFFFFF',
      secondary: '#C7D0D9',
    },
  },
  gradients: {
    ocean: 'linear-gradient(135deg, #07121F 0%, #0B1320 100%)',
    tropical: 'linear-gradient(135deg, #2EE59D 0%, #00D4FF 100%)',
    sunset: 'linear-gradient(135deg, #FFCC00 0%, #FF5C5C 100%)',
    rainbow: 'linear-gradient(90deg, #00D4FF 0%, #2EE59D 33%, #FFCC00 66%, #FF5C5C 100%)',
  },
  shadows: {
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    premium: '0 20px 60px rgba(0, 212, 255, 0.15)',
    soft: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
}

export const animations = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.6,
  },
  easing: {
    easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    custom: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
}
