import envConfig from '../global-env';

export const resolveLoginUrl = (): string => {
    const baseUrl = envConfig.baseUrl?.trim();
    if (!baseUrl) {
        throw new Error('Missing "baseUrl" for the selected environment in Application.json');
    }

    const url = new URL(baseUrl);
    const hasAdminSegment = url.pathname
        .split('/')
        .filter(Boolean)
        .includes('admin');

    if (!hasAdminSegment) {
        const cleanedPath = url.pathname.replace(/\/+$/, '');
        const normalizedPath = cleanedPath === '' || cleanedPath === '/' ? '' : cleanedPath;
        const adminPath = `${normalizedPath}/admin`.replace(/\/{2,}/g, '/');
        url.pathname = adminPath.startsWith('/') ? adminPath : `/${adminPath}`;
    }

    return url.toString();
};
