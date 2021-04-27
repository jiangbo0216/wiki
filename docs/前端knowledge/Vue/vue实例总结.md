phase_1

1. new Vue ()
2. init Event & Lifecycle
3. beforeCreate
4. init injection & reactivity
5. created
6. el
   1. yes -> phase_2 1
   2. no -> when vm.$mount($el) -> phase_2 1

phase_2

1. tempalate
   1. yes
      1. compile template into render funtion
   2. no
      1. compile el's outerHTML as template
   3. beforeMount
   4. create vm.$el and replace el with *
   5. mounted
   6. phase_update
   7. beforeDestroy
   8. tearDown watchers, child components and event Listeners
   9. destroyed

初始化生命周期和事件 -> injection reactive -> compile -> create vm.$el -> tearDown
