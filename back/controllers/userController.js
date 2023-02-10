import { authenticateAndGenerateToken, findById, getAllUsers, getRandomUser,updateProfil, createUser, userDelete,countUser,getCategory} from '../service/userService.js'

import dotenv from "dotenv";


dotenv.config();
const { EXPIRESIN } = process.env;

/**
 * users http://{hostname}:{port}/users
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export async function users(req, res) {
  console.log('Hello world');
  let response = await getAllUsers();
  console.log(response)
  return res.status(200).json(response);
}

export async function usersOld(req, res) {
  let response = await getAll-old();
  console.log(response)
  return res.status(200).json(response);
}

/**
 * users http://{hostname}:{port}/user/1
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export async function getUserById(req, res) {
  let id = req.params.id;
  let rep = await findById(id);
  return res.status(200).json(rep)
}

/**
 * Login http://{hostname}:{port}/login
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export async function login(req, res) {
  let { email, password } = req.body;
  try {
    let token = await authenticateAndGenerateToken(email, password);
    return res.status(200).json({ "idToken": token })
  } catch (err) {
    return res.status(401).send(err.message);
  }
}

/**
 * Login http://{hostname}:{port}/random-user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export async function randomUser(req, res) {
  let randomUser = await getRandomUser(req.auth.userId);
  return res.status(200).json(randomUser);
}


/**
 * Login http://{hostname}:{port}/user/[x]
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export async function editProfil(req, res) {
  try {
     let response = await updateProfil(req,res)
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

/**
 * Login http://{hostname}:{port}/delete/[x]
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export async function deleteUser(req, res) {
  try {
    await userDelete(req,res);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function create(req, res) {
  try {
    let createdUser = await createUser(req, res);
  } catch (err) {
    return res.status(404).send(err.message);
  }
}


//
export async function nbUser(req, res) {
  try {
    let response = await countUser(res);
    console.log(response)
    return res.json(response)
  } catch (err) {
    return res.status(err.status).send(err.message);
  }
}

export async function getCategories(req,res){
  try {
    const response = await getCategory();
    if (!response) {
      return res.status(400).send({ error: "No categories found." });
    }
    return res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
