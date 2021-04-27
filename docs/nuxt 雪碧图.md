npm i webpack-spritesmith -D
```js
    /* 
    ** You can extend webpack config here
    */
    extend (config, { isDev, isClient }) {
      let path = require('path')
      let SpritesmithPlugin = require('webpack-spritesmith')
      // 雪碧图处理模板
      let templateFunction = function (data) {
        let shared = '.icon { display:inline-block; background-image: url(I); background-size:WSMpx HSMpx; }'
          .replace('I', data.sprites[0].image)
          .replace('WSM', data.spritesheet.width)
          .replace('HSM', data.spritesheet.height)

        let perSprite = data.sprites.map(function (sprite) {
          return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
            .replace('N', sprite.name)
            .replace('W', sprite.width)
            .replace('H', sprite.height)
            .replace('X', sprite.offset_x)
            .replace('Y', sprite.offset_y)
        }).join('\n')

        return shared + '\n' + perSprite
      }
      // 雪碧图扩展webpack配置
      config.resolve.modules.push('./assets/img')  // css在哪里能找到sprite图
      config.plugins.push(
        new SpritesmithPlugin({
          src: {
            cwd: path.resolve(__dirname, './assets/img/spr/'), // 图标根路径
            glob: '**/*.png' // 匹配任意 png 图标
          },
          target: {
            image: path.resolve(__dirname, './assets/img/spr.png'), // 生成雪碧图目标路径与名称
            // 设置生成CSS背景及其定位的文件或方式
            css: [
              [
                path.resolve(__dirname, './assets/scss/spr.scss'), {
                  format: 'function_based_template'
                }
              ]
            ]
          },
          customTemplates: {
            'function_based_template': templateFunction
          },
          apiOptions: {
            cssImageRef: '~assets/img/spr.png' // css文件中引用雪碧图的相对位置路径配置
          },
          spritesmithOptions: {
            padding: 10
          }
        })
      )

      return config
    }
  },
```