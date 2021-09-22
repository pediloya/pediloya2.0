export const pedidosType = [
    {
        name: 'Diseño',
        id: 'disenio',
        iconType: 'material',
        icon: `edit`,
        description: 'Promocioná la gestión de tu área',
        secondStep: [
            { name: 'Pieza impresa', id: 'impresa', iconType: 'material', icon: `print` },
            { name: 'Pieza digital', id: 'digital', iconType: 'material', icon: `image` },
            { name: 'Ambas', id: 'ambas', iconType: 'material', icon: `done_all` },
        ],
    },
    {
        name: 'Web',
        id: 'web',
        iconType: 'material',
        icon: `computer`,
        description: 'Modificá o creá contenido',
        secondStep: [
            { name: 'Noticia Web', id: 'noticia', iconType: 'material', icon: 'feed' },
            { name: 'Crear contenido', id: 'crear', iconType: 'material', icon: 'post_add' },
            { name: 'Modificar contenido', id: 'modificar', iconType: 'material', icon: 'edit_note' },
        ],
    },
    {
        name: 'Redes',
        id: 'redes',
        iconType: 'material',
        icon: `facebook`,
        description: 'Compartí las novedades',
        secondStep: [
            { name: 'Facebook', id: 'facebook', iconType: 'custom', icon: 'facebook' },
            { name: 'Twitter', id: 'twitter', iconType: 'custom', icon: 'twitter' },
            { name: 'Ambas', id: 'ambas', iconType: 'material', icon: 'done_all' },
        ],
    },
    {
        name: 'Somos',
        id: 'somos',
        iconType: 'material',
        icon: `email`,
        description: 'Comunicá internamente',
        secondStep: [
            { name: 'Entre Nos', id: 'EntreNos', iconType: 'custom', icon: 'somos-entre_nos.svg' },
            { name: 'No te lo pierdas', id: 'NoTeLoPierdas', iconType: 'custom', icon: 'somos-no_te_lo_pierdas.svg' },
            { name: 'Te enteraste', id: 'TeEnteraste', iconType: 'custom', icon: 'somos-te_enteraste.svg' },
        ],
    },
]

export const types = {
    disenio: [
        { name: 'Pieza impresa', id: 'impresa', iconType: 'material', icon: `print` },
        { name: 'Pieza digital', id: 'digital', iconType: 'material', icon: `image` },
        { name: 'Ambas', id: 'ambas', iconType: 'material', icon: `done_all` },
    ],
    web: [
        { name: 'Noticia Web', id: 'noticia', iconType: 'material', icon: 'feed' },
        { name: 'Crear contenido', id: 'crear', iconType: 'material', icon: 'post_add' },
        { name: 'Modificar contenido', id: 'modificar', iconType: 'material', icon: 'edit_note' },
    ],
    redes: [
        { name: 'Facebook', id: 'facebook', iconType: 'custom', icon: 'facebook' },
        { name: 'Twitter', id: 'twitter', iconType: 'custom', icon: 'twitter' },
        { name: 'Ambas', id: 'ambas', iconType: 'material', icon: 'done_all' },
    ],
    somos: [
        { name: 'Entre Nos', id: 'EntreNos', iconType: 'custom', icon: 'somos-entre_nos.svg' },
        { name: 'No te lo pierdas', id: 'NoTeLoPierdas', iconType: 'custom', icon: 'somos-no_te_lo_pierdas.svg' },
        { name: 'Te enteraste', id: 'TeEnteraste', iconType: 'custom', icon: 'somos-te_enteraste.svg' },
    ],
}
