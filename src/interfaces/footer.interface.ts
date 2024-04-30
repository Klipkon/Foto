import type { Button } from "./page";

export interface Footer {
    id:         number;
    attributes: FooterDataAttributes;
}

export interface FooterDataAttributes {
    description: string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    logo:        Logo;
    navigation:  Navigation[];
    cta:         Button;
}

export interface Logo {
    data: LogoData;
}

export interface LogoData {
    id:         number;
    attributes: LogoAttributes;
}

export interface LogoAttributes {
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
