const { src, dest } = require('gulp');

const concat = require('gulp-concat');


// Tarefa para combinar os ficheiros SQL

function combinarSQL() {

  return src('db/*.sql')  // Caminho para os ficheiros SQL

    .pipe(concat('queries_combinadas.sql'))  // Nome do ficheiro final

    .pipe(dest('dist'));  // Pasta de destino

}

exports.default = combinarSQL;