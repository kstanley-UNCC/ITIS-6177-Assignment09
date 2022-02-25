exports.handler = async (event) => {
    const body = JSON.parse(event.body || {});
    const keyword = (body.keyword || 'nothing');

    const response = {
        statusCode: 200,
        body: `Ken Stanley says ${encodeURI(keyword).replace(/\%20/g, ' ')}`,
    };
    return response;
};
