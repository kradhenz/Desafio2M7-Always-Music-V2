import { addStudent, showStudents, showByEmail, updateStudent, deleteByEmail } from './controllers/queries.js';

const argumento = process.argv.slice(2)
const opcion = argumento[0]
const genero = argumento[1]
const FDN = argumento[2]
const telefono = argumento[3]
const email = argumento[4]
const pais = argumento[5]
const nombre = argumento[6]

const main = async () => {
    switch (opcion) {
        case 'add':
            addStudent(genero, FDN, telefono, email, pais, nombre);
            break;
        case 'all':
            showStudents();
            break;
        case 'getEmail':
            {
                const email = argumento[1];
                showByEmail(email);
            }
            break;
        case 'update':
            {
                const id = argumento[1];
                const genero = argumento[2];
                const FDN = argumento[3];
                const telefono = argumento[4];
                const email = argumento[5];
                const pais = argumento[6];
                const nombre = argumento[7];
                updateStudent(id, genero, FDN, telefono, email, pais, nombre);
            }
            break;
        case 'delete':
            {
                const email = argumento[1];
                deleteByEmail(email);
            }
            break;
        default:
            console.log('Opción no válida');
    }


}