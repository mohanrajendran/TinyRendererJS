module.exports = function(obj_string) {
  this.cacheable();

  var vertices = [];
  var faces = [];

  var lines = obj_string.split('\n')

  lines.forEach(function(line) {
    tokens = line.split(' ');
    if (tokens[0] === 'v') {
      vertices.push(parse_vertex(tokens.slice(1)));
    } else if (tokens[0] === 'f') {
      faces.push(parse_face(tokens.slice(1)));
    }
  });

  var mesh = {
    'vertices': vertices,
    'faces': faces
  };

  return 'module.exports = ' + JSON.stringify(mesh);
}

function parse_vertex(tokens) {
  return tokens.map(function(token) {
    return +token;
  })
}

function parse_face(tokens) {
  return tokens.map(function(token) {
    return +(token.split('/')[0]);
  })
}