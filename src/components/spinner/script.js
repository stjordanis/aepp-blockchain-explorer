/**
 * Exporting Component Logic
 */
export default {
  /*
   * Component Name
   */
  name: 'spinner',

  /*
   * Prop Names
   */
  props: {
    size: { default: '100px' },
    background: { default: '#FFFFFF' },
    duration: { default: '1.2s' }
  },

  /*
   * Computed Props
   */
  computed: {
    rectStyles () {
      return { backgroundColor: this.background, animationDuration: this.duration }
    },
    styles () {
      return { width: this.size, height: this.size }
    }
  }
};
