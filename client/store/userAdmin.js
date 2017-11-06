import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS';

/**
 * INITIAL STATE
 */
const defaultUserS = [];

/**
 * ACTION CREATORS
 */
const getUsers = users => ()
