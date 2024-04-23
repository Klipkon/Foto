export interface Page {
    id: number
    attributes: Attributes
}

export interface Attributes {
    Slug: string
    Title: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    Components: Component[]
}

export interface Component {
    id: number
    __component: string
    Description?: string
    Title: any
    Image?: Image
    Video?: Video
    Button: any
    Cards?: Card[]
    Logo?: Logo
    Link?: Link[]
}

export interface Image {
    data: Data
}

export interface Data {
    id: number
    attributes: Attributes2
}

export interface Attributes2 {
    name: string
    alternativeText: any
    caption: any
    width: number
    height: number
    formats: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: any
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
}

export interface Formats {
    thumbnail: Thumbnail
    small: Small
}

export interface Thumbnail {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    sizeInBytes: number
    url: string
}

export interface Small {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    sizeInBytes: number
    url: string
}

export interface Video {
    data: Data2
}

export interface Data2 {
    id: number
    attributes: Attributes3
}

export interface Attributes3 {
    name: string
    alternativeText: any
    caption: any
    width: any
    height: any
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: any
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
}

export interface Card {
    id: number
    Title: string
    Description: string
    Highlighted: boolean
    Link: boolean
}

export interface Logo {
    data: Data3
}

export interface Data3 {
    id: number
    attributes: Attributes4
}

export interface Attributes4 {
    name: string
    alternativeText: any
    caption: any
    width: number
    height: number
    formats: any
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: any
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
}

export interface Link {
    id: number
    Href: string
    Title: string
}

export interface Meta {}
