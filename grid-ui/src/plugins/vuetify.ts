import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDataTableServer, VDataTableRow } from 'vuetify/labs/VDataTable'
import { VVirtualScroll } from 'vuetify/labs/VVirtualScroll'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

// Todo (Nour): [ui] define app theme
// https://vuetifyjs.com/en/styles/colors/#javascript-color-pack
export default createVuetify({
  components: {
    VDataTableServer,
    VDataTableRow,
    VVirtualScroll,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
