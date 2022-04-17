const FormData = require("form-data");

export default (data: { [x: string]: string | number | string[] }) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        console.log(`Key: '${key}', Value: '${escape(value.toString() || "")}'`);
        formData.append(key, escape(value.toString() || ""))
    });
    return formData;
}
