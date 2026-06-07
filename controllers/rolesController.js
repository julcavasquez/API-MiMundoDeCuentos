const Roles = require('../models/rolesModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.obtenerRoles = async (req, res) => {

  try {

    const roles = await Roles.getAll();

    res.status(200).json(roles);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Error al obtener roles'
    });

  }

};

