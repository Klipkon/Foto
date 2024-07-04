import type { Button } from "./page";

export interface Header {
    id:         number;
    attributes: HeaderAttributes;
}

export interface HeaderAttributes {
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    logo:        Logo;
    cta:         Button;
    navigation:  Navigation[];
}

export interface Logo {
    data: Data;
}

export interface Data {
    id:         number;
    attributes: DataAttributes;
}

export interface DataAttributes {
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             number;
    height:            number;
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

export interface Navigation {
    id:    number;
    href:  string;
    title: string;
}