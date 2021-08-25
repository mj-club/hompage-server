module.exports.ExistUserError = (errorMessage) => {
	const err = new Error();
	err.name = "ExistUserError";
	err.message = errorMessage;
	err.status = 412;
	return err;
};

module.exports.NoSuchDataError = (errorMessage) => {
	const err = new 
	err.name = "NoSuchDataError";
	err.message = errorMessage;
	err.status = 404;
	return err;
};
