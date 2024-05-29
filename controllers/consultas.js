import pool from '../config/db.js'

const argumento = process.argv.slice(2)
const opcion = argumento[0]
const genero = argumento[1]
const FDN = argumento[2]
const telefono = argumento[3]
const email = argumento[4]
const pais = argumento[5]
const nombre = argumento[6]

// Agregar un nuevo estudiante
const addStudent = async (genero, FDN, telefono, email, pais, nombre) => {
    try {
        const consulta = {
            text: 'INSERT INTO users (genero, FDN, telefono, email, pais, nombre) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            values: [genero, FDN, telefono, email, pais, nombre]
        }
        const respuesta = await pool.query(consulta)
        console.log('Estudiante agregado correctamente', respuesta.rows[0])
    } catch (error) {
        console.log(error.code, error.message)
    }
}

// Consultar los estudiantes registrados
const showStudents = async () => {
    try {
        const consulta = {
            text: 'SELECT * FROM users',
            rowMode: 'array'
        }
        const respuesta = await pool.query(consulta);
        console.log('Los estudiantes registrados son:', respuesta.rows)
    } catch (error) {
        console.log(error.code, error.message)
    }
}

// Consultar estudiante por email
const showByEmail = async (email) => {
    try {
        const consulta = {
            text: 'SELECT * FROM users WHERE email = $1',
            values: [email]
        }
        const respuesta = await pool.query(consulta)
        console.log(`El estudiante con el email ${email} es:`, respuesta.rows[0])
    } catch (error) {
        console.log(error.code, error.message)
    }
}

// Actualizar la información de un estudiante
const updateStudent = async (id, genero, FDN, telefono, email, pais, nombre) => {
    try {
        const consulta = {
            text: 'UPDATE users SET genero = $1, FDN = $2, telefono = $3, email = $4, pais = $5, nombre = $6 WHERE id = $7 RETURNING *',
            values: [genero, FDN, telefono, email, pais, nombre, id]
        }
        const respuesta = await pool.query(consulta)
        console.log('Estudiante actualizado correctamente', respuesta.rows[0])
    } catch (error) {
        console.log(error.code, error.message)
    }
}

// Eliminar el registro de un estudiante
const deleteByEmail = async (email) => {
    try {
        const consulta = {
            text: 'DELETE FROM users WHERE email = $1 RETURNING *',
            values: [email]
        }
        const respuesta = await pool.query(consulta)
        console.log('Estudiante eliminado correctamente', respuesta.rows[0])
    } catch (error) {
        console.log(error.code, error.message)
    }
}

if (opcion === 'add') {
    addStudent(genero, FDN, telefono, email, pais, nombre)
} else if (opcion === 'all') {
    showStudents()
} else if (opcion === 'getEmail') {
    const email = argumento[1]
    showByEmail(email)
} else if (opcion === 'update') {
    const id = argumento[1]
    const genero = argumento[2]
    const FDN = argumento[3]
    const telefono = argumento[4]
    const email = argumento[5]
    const pais = argumento[6]
    const nombre = argumento[7]
    updateStudent(id, genero, FDN, telefono, email, pais, nombre)
} else if (opcion === 'delete') {
    const email = argumento[1]
    deleteByEmail(email)
}

export { addStudent, showStudents, showByEmail, updateStudent, deleteByEmail };