export interface Page {
    id:         number;
    attributes: PageAttributes;
}

export interface PageAttributes {
    title:       string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    slug:        string;
    components:  Component[];
}

export interface Component {
    id:           number;
    __component:  string;
    logo?:        Logo;
    navigation?:  Navigation[];
    cta?:         Button;
    description?: null | string;
    title?:       TitleClass | string;
    buttons?:     Button[];
    image?:       Image;
    cards?:       Card[];
}

export interface Button {
    id:      number;
    content: string;
    variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size:    string;
    href:    null | string;
}

export interface Card {
    id:          number;
    title:       string;
    description: string;
    highlighted: boolean;
    link:        boolean;
    image:       Logo;
}

export interface Logo {
    data: LogoData;
}

export interface LogoData {
    id:         number;
    attributes: LogoDataAttributes;
}

export interface LogoDataAttributes {
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             number;
    height:            number;
    formats:           LogoFormats | null;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    createdAt:         Date;
    updatedAt:         Date;
}

export interface LogoFormats {
    thumbnail: Small;
}

export interface Small {
    name:        string;
    hash:        string;
    ext:         string;
    mime:        string;
    path:        null;
    width:       number;
    height:      number;
    size:        number;
    sizeInBytes: number;
    url:         string;
}

export interface Image {
    data: ImageData;
}

export interface ImageData {
    id:         number;
    attributes: ImageDataAttributes;
}

export interface ImageDataAttributes {
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             number;
    height:            number;
    formats:           ImageFormats;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    createdAt:         Date;
    updatedAt:         Date;
}

export interface ImageFormats {
    thumbnail: Small;
    small:     Small;
}

export interface Navigation {
    id:    number;
    href:  string;
    title: string;
}

export interface TitleClass {
    id:      number;
    content: string;
}
