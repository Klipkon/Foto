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
    description?: null | string;
    title?:       string;
    buttons?:     Button[];
    button?:      Button;
    image?:       Image;
    images?:      Images;
    cards?:       Card[];
    video?:       Video;
    form?:        Form;
    reversed?:    boolean;
}

export interface Button {
    id:      number;
    content: string;
    variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size:    "default" | "sm" | "lg" | "icon" | null | undefined;
    href:    null | string;
}

export interface Card {
    id:          number;
    title:       string;
    description: string;
    highlighted: boolean;
    link:        boolean;
    image:       Image;
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

export interface Images {
    data: ImageData[];
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
    small?:     Small;
}

export interface TitleClass {
    id:      number;
    content: string;
}

export interface Video {
    data: Data;
}

export interface Data {
    id:         number;
    attributes: Attributes;
}

export interface Attributes {
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             null;
    height:            null;
    formats:           null;
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

export interface Form {
    id:     number;
    fields: Field[];
    button: Button;
}

export interface Field {
    id:          number;
    label:       string;
    type:        "email" | "text" | "password";
    placeholder: string;
    textarea:    boolean;
}
