export const allowImg = ['image/png', 'image/jpg', 'image/jpeg']

export const allowZip = [
    'application/x-7z-compressed',
    'application/zip',
    'application/x-zip-compressed',
    'application/x-rar-compressed',
    'application/x-tar',
    'application/vnd.rar',
]

export const allowDocument = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']

export const allowPpt = ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']

export const allowPdf = ['application/pdf']

const allowTypes = {
    allowImg: ['image/png', 'image/jpg', 'image/jpeg'],
    allowZip: [
        'application/x-7z-compressed',
        'application/zip',
        'application/x-zip-compressed',
        'application/x-rar-compressed',
        'application/x-tar',
        'application/vnd.rar',
    ],
    allowDocument: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'],
    allowPpt: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    allowPdf: ['application/pdf'],
}

export default allowTypes
