// importamos la funcion que vamos a testear
import { resolveRoutes } from '../src/utils/resolveRoutes.js';

/* Test: Resolver la ruta */
describe('Resolver la ruta', () => {
    it('Checar que la ruta obtenida se encuentre en la lista de rutas', () => {
        expect(resolveRoutes('/bienvenida')).toBe('/bienvenida');
    });
});

/*
describe('¿La ruta es a un directorio o a un archivo?', () => {
    it('Debe retornar directory, pues la ruta es un directorio', () => {
        expect(isDirectoryOrFile(validDirRoute)).resolves.toEqual('directory');
    });
    it('Debe retornar file, pues la ruta es un archivo', () => {
        expect(isDirectoryOrFile(mdFileRoute)).resolves.toEqual('file');
    });
}); */
