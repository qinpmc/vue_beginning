 
export default {
  props: {
    name: {
      type: String,
      // default: 'Vue!'
    }
  },
  template:`
    <div>
        <h2 class="hello">Hello {{name}} {{ $attrs }}</h2>
    </div>
  `
  }
 