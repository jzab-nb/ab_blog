import WebDeveloperSvg from '@site/static/svg/undraw_web_developer.svg'
import OpenSourceSvg from '@site/static/svg/undraw_open_source.svg'
import SpiderSvg from '@site/static/svg/undraw_spider.svg'
import Translate, { translate } from '@docusaurus/Translate'

export type FeatureItem = {
  title: string
  text: JSX.Element
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
}

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.feature.developer',
      message: 'JAVA 全栈工程师',
    }),
    text: (
      <Translate>
        主攻JAVA方向，同时兼修前端。对JAVA和前端相关的技术栈都有涉猎。
      </Translate>
    ),
    Svg: WebDeveloperSvg,
  },
  {
    title: translate({
      id: 'homepage.feature.spider',
      message: '技术涉猎广泛',
    }),
    text: (
      <Translate>
        同时学习过Python语言并做过一些项目，在之前的实习中对linux相关技术也有深入的应用。
      </Translate>
    ),
    Svg: SpiderSvg,
  },
  {
    title: translate({
      id: 'homepage.feature.enthusiast',
      message: '热爱探索新技术和造轮子',
    }),
    text: (
      <Translate>
        对新兴技术Rust有一定的兴趣，曾尝试过使用Rust开发操作系统内核。也喜欢造轮子的感觉。
      </Translate>
    ),
    Svg: OpenSourceSvg,
  },
]

export default FEATURES
