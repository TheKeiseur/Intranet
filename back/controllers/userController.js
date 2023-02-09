 
import { authenticateAndGenerateToken, findById, getAllUsers, getRandomUser,updateProfil,userDelete } from '../service/userService.js'

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
  let response = await getAllUsers();
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
    return res.status(401).message(err.message);
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
    let response = await userDelete(req,res)
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
