export enum ContentGraphEntity {
    channel = 'channel',
    person = 'person',
    postGroup = 'postGroup',
    post = 'post',
    campaign = 'campaign',
    page = 'page',
    show = 'show',
}

export enum AttributeType {
    array = 'array',
    enum = 'enum',
    int = 'int',
    float = 'float',
    string = 'string',
    localizedString = 'localizedString',
    color = 'color',
    bool = 'boolean',
    text = 'text',
    object = 'object',
    vector = 'vector',
    image = 'image',
    polyForm = 'polyForm',
    container = 'container',
    tags = 'tags',
    group = 'group',
    postList = 'postlist',
    file = 'file',
    audio = 'audio',
    latLng = 'latlong',
    action = 'action',
    event = 'event',
    graph = 'graph',
    data = 'data',
    weekday = 'weekday',
    time = 'time',
    tree = 'tree',
}

export enum ContentGraphLayoutType {
    block = 'block',
    flow = 'flow',
    stack = 'stack',
    grid = 'grid'
}

export enum PostType {
    Article = 'Article',
    Podcast = 'Podcast',
    Event = 'Event',
    Video = 'Video'
}

export enum ContentGraphAudioType {
    podcast = 'podcast'
}

export enum ContentGraphImageType {
    content = 'content'
}

export enum ContentGraphBreakPoint {
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl'
}

export interface ContentGraphImage {
    url: string;
    thumbnail: string;
    baseSize: [number, number];
}

export interface ContentGraphBreakpointLayout {
    type: ContentGraphLayoutType | keyof Record<string, ContentGraphLayoutType>;

    [key: string]: any;
}

export type ContentGraphBreakpointsLayout = {
    [key in ContentGraphBreakPoint]?: ContentGraphBreakpointLayout;
};

export interface WebApp {
    id: string;
    url: string;
    displayName?: string;
}

export interface Locale {
    locale: string;
    displayName?: string;
}

export interface ElementStyle {
  size?: [string, string];
  border?: {
    color: [
      string, string, string, string
    ];
    style: [
      string, string, string, string
    ];
    width: [
      string, string, string, string
    ];
    radius: [
      string, string, string, string
    ];
  };
  margin?: [
    string, string, string, string
  ];
  shadow?: {
    type: string;
    color: string;
    offset: [
      string, string
    ]
    blurRadius: string;
    spreadRadius: string;
  };
  maxSize?: [
    string, string
  ];
  minSize?: [
    string, string
  ];
  padding?: [
    string, string, string, string
  ];
  background?: {
    type: string;
    color: string;
  };
  corners: [number, number, number, number];
}

export interface ContentGraphCronCondition {
    weekDays?: Array<string>;
    enabled?: {
        min: string;
        max: string;
    };
    localTime?: {
        min: string;
        max: string;
    };
}

export interface ContentGraphUserCondition {
    userId?: {
        missing: boolean;
    };
    gender?: {
        include: Array<string>;
        exclude: Array<string>;
    };
    age?: {
        min: number;
        max: number;
    };
}

export interface ContentGraphElementConditions {
    cron?: ContentGraphCronCondition;
    user?: ContentGraphUserCondition;
}

export interface ContentGraphElementAttributes {
    children?: Container;

    [key: string]: any;
}

export interface ContentGraphElement {
    elementId: string;
    componentType: string;
    displayName?: string;
    componentKind?: string;
    baseType?: string;
    locked?: boolean;
    hidden?: boolean;
    style?: ElementStyle;
    conditions?: ContentGraphElementConditions;
    attributes?: ContentGraphElementAttributes;
}

export interface Container {
    layout?: ContentGraphBreakpointLayout | ContentGraphBreakpointsLayout;
    elements: Array<ContentGraphElement>;
    style?: ElementStyle;
}

export interface LocalizedString {
    [key: string]: string;
}

export interface ContentGraphPreview {
    image: ContentGraphImage;
    title: string;
    main: Container;

    [key: string]: any;
}

export interface ContentGraphAttributes {
    image: string;
    title: LocalizedString;
    main: Container;

    [key: string]: any;
}

export interface ContentGraph {
    classId: string;
    owner: string;
    published: string;
    type: string;
    updated: string;
    version: string;
    attributes: ContentGraphAttributes;
}

export interface ContentGraphComponentElementSchema {
    id: string;
    componentId: string;
    title: string;
    type: AttributeType | keyof Record<string, AttributeType>;
    builtIn: boolean;
    baseType: string;
    readonly: boolean;
    category: string;
    help: string;
    kind: string;
    attributes: Array<AttributeSchema>;
    componentAttributes: any;
    abstract?: boolean;

    [key: string]: any;
}

export interface AttributeSchema {
    name: string;
    title: string;
    type: AttributeType | string;
    help?: string;
    inline?: boolean;
    required?: boolean;
    readonly?: boolean;
    searchIndex?: boolean;

    [key: string]: any;
}

export interface ContentGraphSchema {
    id: string;
    attributes: Array<AttributeSchema>;
    abstract: boolean;
    baseNid: string;
    baseType: string;
    classAttributes?: { [key: string]: any };
    title: string;
    type: AttributeType | keyof Record<string, AttributeType>;
    help: string;
    imageUrl: string;
    defaultTemplateId: string;
    created: string;
    updated: string;
}

export interface BreakpointConfig<T> {
    sm: T;
    md?: T;
    lg?: T;
    xl?: T;
}

export interface VendorThemeConfig {
    name: string;
    isDark: boolean;
    values: {
        baseUnit: string;
        spacing: {
            sp1: string;
            sp2: string;
            sp3: string;
            sp4: string;
            sp5: string;
            sp6: string;
            sp7: string;
            sp8: string;
            sp9: string;
        };
        padding: {
            page: string | BreakpointConfig<string>;
        };
        margin: {
            float: string | BreakpointConfig<string>;
            block: string | BreakpointConfig<string>;
        };
        layoutWidths: {
            page: string;
            block: string;
        };
    };
    colors: {
        primary: string;
        onPrimary: string;
        accentPrimary: string;
        highlightPrimary: string;
        primaryVariant: string;
        onPrimaryVariant: string;
        accentPrimaryVariant: string;
        highlightPrimaryVariant: string;
        secondary: string;
        onSecondary: string;
        accentSecondary: string;
        highlightSecondary: string;
        secondaryVariant: string;
        onSecondaryVariant: string;
        accentSecondaryVariant: string;
        highlightSecondaryVariant: string;
        background: string;
        onBackground: string;
        accentBackground: string;
        highlightBackground: string;
        surface: string;
        onSurface: string;
        accentSurface: string;
        highlightSurface: string;
        error: string;
        onError: string;
        accentError: string;
        highlightError: string;
        focus: string;
        overlay: string;
        onOverlay: string;
        highlightOverlay: string;
        controls: {
            default: string;
            onDefault: string;
            highlightDefault: string;
            disabledDefault: string;
            primary: string;
            onPrimary: string;
            highlightPrimary: string;
            disabledPrimary: string;
            danger: string;
            onDanger: string;
            highlightDanger: string;
            disabledDanger: string;
            background: string;
            onBackground: string;
            border: string;
            focus: string;
            placeholder: string;
            highlight: string;
            error: string;
        };
        placeholder: {
            base: string;
            on: string;
        };
        playBar: {
            base: string;
            on: string;
            accent: string;
            highlight: string;
        };
        teaser: {
            icon: string;
        };
        text: {
            base: string;
            variant: string;
            highlight: string;
            title: string;
            link: string;
        };
        toggle: {
            background: string;
            onBackground: string;
        };
    };
}

export interface AppConfig {
    appId: string;
    footerNavigationPageId: string;
    apiHost: string;
    station: string;
    name: string;
    apiVersion: string;
    languages: string[];
    displayName: string;
    themes: Record<string, VendorThemeConfig>;
    breakpoints: BreakpointConfig<string>;
    featureTypes: Array<{ featureType: string, label: string }>;
    modules: any;
}
