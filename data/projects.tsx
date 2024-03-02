export const projects: Project[] = [
  {
    title: '简易2048',
    description: '个人开发的简易版2048',
    preview: '/img/project/2048.png',
    website: 'http://vip.jzab.xyz:2048/',
    source: 'https://github.com/jzab-nb/simpal2048',
    tags: ['opensource', 'personal', 'favorite'],
    type: 'toy',
  },
  {
    title: '答题系统后端',
    description: '答题系统的后端部分',
    preview: '/img/project/answer_backend.png',
    website: 'https://github.com/jzab-nb/answer_backend',
    source: 'https://github.com/jzab-nb/answer_backend',
    tags: ['opensource', 'personal'],
    type: 'web',
  },
  
  {
    title: 'abAPI',
    description: '自己实现的API开放平台',
    preview: '/img/project/abapi.png',
    website: 'https://github.com/jzab-nb/abapi',
    source: 'https://github.com/jzab-nb/abapi',
    tags: ['opensource', 'personal'],
    type: 'web',
  }
]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType = 'favorite' | 'opensource' | 'product' | 'design' | 'large' | 'personal'

export type ProjectType = 'web' | 'app' | 'commerce' | 'personal' | 'toy' | 'other'

export const projectTypeMap = {
  web: '网站',
  app: '应用',
  commerce: '商业项目',
  personal: '个人',
  toy: '玩具',
  other: '其他',
}

export type Project = {
  title: string
  description: string
  preview?: string
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  }
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce(
  (group, project) => {
    const { type } = project
    group[type] = group[type] ?? []
    group[type].push(project)
    return group
  },
  {} as Record<ProjectType, Project[]>,
)
