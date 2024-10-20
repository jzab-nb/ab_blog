import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  skill: [
    'skill/introduction',
    {
      label: 'git笔记',
      type: 'category',
      link: {
        type: 'doc',
        id: 'skill/git/git',
      },
      items: [
        'skill/git/git'
      ],
    },
    {
      label: 'docker笔记',
      type: 'category',
      link: {
        type: 'doc',
        id: 'skill/docker',
      },
      items: [
        'skill/docker'
      ],
    },
    {
      label: 'java笔记',
      type: 'category',
      link: {
        type: 'generated-index'
      },
      items: [
        'skill/java笔记/mysql',
        'skill/java笔记/javaweb',
        'skill/java笔记/ssm',
        'skill/java笔记/springBoot',
      ],
    },
    {
      label: '前端进阶',
      type: 'category',
      link: {
        type: 'generated-index'
      },
      items: [
        'skill/前端进阶/大前端',
        'skill/前端进阶/ts',
        'skill/前端进阶/vue'
      ],
    },
    {
      label: '算法',
      type: 'category',
      link: {
        type: 'generated-index'
      },
      items: [
        'skill/算法/day',
        'skill/算法/sxl',
      ],
    },
  ],
  tools: [
    // 'tools/introduction',
    // 'tools/everything-quick-search-local-files',
    // 'tools/wappalyzer-recognize-technology',
    // 'tools/windows-custom-right-click-menu',
    // 'tools/vscode-config',
    // 'tools/idea-config',
    // 'tools/vite-plugin',
    // 'tools/jetbrains-product-activation-method',
  ],
}

module.exports = sidebars
