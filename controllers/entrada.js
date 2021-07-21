const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {models} = require("../models");

const paginate = require('../helpers/paginate').paginate;


// Autoload la entrada asociada a :entradaId
exports.load = async (req, res, next, entradaId) => {

    try {
        const entrada = await models.Entrada.findByPk(entradaId);
        if (entrada) {
            req.load = {...req.load, entrada};
            next();
        } else {
            throw new Error('There is no new with id=' + entradaId);
        }
    } catch (error) {
        next(error);
    }
};

// GET /entradas
exports.index = async (req, res, next) => {

    let countOptions = {};
    let findOptions = {};

    // Search:
    const search = req.query.search || '';
    if (search) {
        const search_like = "%" + search.replace(/ +/g,"%") + "%";

        countOptions.where = {titular: { [Op.like]: search_like }};
        findOptions.where = {titular: { [Op.like]: search_like }};
    }


    try {
        const count = await models.Entrada.count(countOptions);

        // Pagination:

        const items_per_page = 10;

        // The page to show is given in the query
        const pageno = parseInt(req.query.pageno) || 1;

        // Create a String with the HTMl used to render the pagination buttons.
        // This String is added to a local variable of res, which is used into the application layout file.
        res.locals.paginate_control = paginate(count, items_per_page, pageno, req.url);

        findOptions.offset = items_per_page * (pageno - 1);
        findOptions.limit = items_per_page;

        const entradas = await models.Entrada.findAll(findOptions);
        res.render('entradas/index.ejs', {
            entradas,
            search
        });
    } catch (error) {
        next(error);
    }
};

// GET /entradas/:entradaId
exports.show = (req, res, next) => {

    const {entrada} = req.load;

    res.render('entradas/show', {entrada});
};

// GET /entradas/new
exports.new = (req, res, next) => {

    const entrada = {
        titular: "",
        articulo: ""
    };

    res.render('entradas/new', {entrada});
};

// POST /entradas/create
exports.create = async (req, res, next) => {

    const {titular, articulo} = req.body;

    let entrada = models.Entrada.build({
        titular,
        articulo
    });

    try {
        // Saves only the fields titular and articulo into the DDBB
        entrada = await entrada.save({fields: ["titular", "articulo"]});
        req.flash('success', 'Entrada creada satisfactoriamente.');
        res.redirect('/entradas/' + entrada.id);
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Hay errores en el form:');
            error.errors.forEach(({message}) => req.flash('error', message));
        } else {
            req.flash('error', 'Error creando una nueva Entrada: ' + error.message);
            next(error);
        }
    }
};

// GET /entradas/:entradaId/edit
exports.edit = (req, res, next) => {

    const {entrada} = req.load;

    res.render('entradas/edit', {entrada});
};

// PUT /entradas/:entradaId
exports.update = async (req, res, next) => {

    const {body} = req;
    const {entrada} = req.load;

    entrada.titular = body.titular;
    entrada.articulo = body.articulo;

    try {
        await entrada.save({fields: ["titular", "articulo"]});
        req.flash('success', 'Entrada editada satisfactoriamente.');
        res.redirect('/entradas/' + entrada.id);
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Hay errores en el form:');
            error.errors.forEach(({message}) => req.flash('error', message));
            res.render('entradas/edit', {entrada});
        } else {
            req.flash('error', 'Error editando la Entrada: ' + error.message);
            next(error);
        }
    }
};

// DELETE /entradas/:entradaId
exports.destroy = async (req, res, next) => {

    try {
        await req.load.entrada.destroy();
        req.flash('success', 'Entada borrada satisfactoriamente.');
        res.redirect('/goback');
    } catch (error) {
        req.flash('error', 'Error borrando la entrada: ' + error.message);
        next(error);
    }
};

