// Quasar Notify options & helper function
import { Notify } from 'quasar'
// eslint-disable-next-line
const configExample = {
  message: `A text with your alert's awesome message`,
  timeout: 3000, // in milliseconds; 0 means no timeout
  type: 'positive', // Available values: 'positive', 'negative', 'warning', 'info'
  color: 'positive', // has default when 'type' is set
  icon: 'wifi', // has default when 'type' is set
  textColor: 'black', // if default 'white' doesn't fits
  avatar: 'statics/boy-avatar.png', // icon OR avatar
  detail: 'Optional detail message.',
  position: 'top-right', // 'top', 'left', 'bottom-left' etc
  actions: [
    {
      label: 'Snooze',
      handler: () => {
        console.log('acting')
      }
    }
  ]
}

const presets = {
  toast: {
    timeout: 5000,
    color: 'blue-grey-10',
    position: 'bottom',
    actions: [{ icon: 'close' }]
  },
  error: {
    timeout: 100000,
    type: 'negative',
    detail: 'error',
    position: 'top-right',
    actions: [{ icon: 'close' }]
  },
  info: {
    timeout: 100000,
    type: 'info',
    position: 'top-right',
    actions: [{ icon: 'close' }]
  }
}
// config: (1) a Quasar Notify config object (2) a 'preset' attribute
export default function (config) {
  const preset = config.preset
  delete config.preset
  if (preset) {
    Notify.create(Object.assign(presets[preset], config))
  } else {
    Notify.create(config)
  }
}
