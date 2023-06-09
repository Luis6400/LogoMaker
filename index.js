const inquirer = require('inquirer');
const fs = require('fs');


class logo {

    constructor(shape, text) {
        this.shape = shape;
        this.text = text;
    }

    createsvg() {
        return `
        <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">\n
        ${this.shape.getline()}\n
        ${this.text.getline()}\n
        </svg>
        `
    }

}

class shape {
    constructor(type, color) {
        this.type = type;
        this.color = color;
    }

    getline() {
        var svgstring = '';
        switch (this.type) {
            case 'Square':
                svgstring += '<rect width="200" height="200" style="fill:' + this.color + ';stroke-width:3;stroke:' + this.color + '" />\n';
                break;
            case 'Circle':
                svgstring += '<circle cx="150" cy="100" r="80" fill="' + this.color + '" />\n';
                break;
            case 'Triangle':
                svgstring += '<polygon points="150,20 220,180 80,180" style="fill:' + this.color + ';stroke:' + this.color + ';stroke-width:3" />\n';
                break;
        }
        return svgstring;
    }
}

class text {
    constructor(text, color) {
        this.text = text;
        this.color = color;
    }

    getline() {
        var svgstring = '';
        svgstring += '<text x="30%" y="50%" dominant-baseline="middle" font-size="100" text-anchor="middle" fill="' + this.color + '">' + this.text + '</text>\n';
        return svgstring;
    }
}


inquirer
    .prompt([
        {
            type: 'input',
            message: 'Logo letters: (Up to 3)',
            name: 'name',
        },
        {
            type: 'input',
            message: 'Text color: (hexadecimal or color name)',
            name: 'tcolor',
        },
        {
            type: 'list',
            choices: ['Square', 'Circle', 'Triangle'],
            message: 'Logo shape: (Square, Circle, Triangle)',
            name: 'shape',
        },
        {
            type: 'input',
            message: 'Shape color: (hexadecimal or color name)',
            name: 'scolor',
        }
    ])
    .then((response) => {
        
        var shapeinput = new shape(response.shape, response.scolor);
        var textinput = new text(response.name, response.tcolor);
        var comlogo = new logo(shapeinput, textinput);
        var svgstring = comlogo.createsvg();

        fs.writeFile('./Assets/logo.svg', svgstring, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
     
        });
    });


module.exports = {logo, shape, text};
    
    

