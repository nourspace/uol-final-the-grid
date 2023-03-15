import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export default createVuetify({
  components: {
    VDataTableServer,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
