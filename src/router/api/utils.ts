const ERROR_OBJS = {
  UNAUTHORIZED: {
    error: 401,
    msg: 'Unauthorized',
    token: null
  },
  
  MORE_BODY_REQUIRES(...bodys: string[]) {
    let strBodys = ''
  
    bodys.forEach((val, i) => { 
      if (i === bodys.length) return strBodys += `'${val}'`
      strBodys += `'${val}' `
    })
  
    return {
      error: 400,
      msg: `More body(${strBodys}) requires`
    }
  }
}

function genSalt () {
  let salt = ''

  for (let i = 0; i < 50; i++) {
    salt += String.fromCharCode(Math.floor(Math.random() * 65535))
  }
  
  return salt
}

export { ERROR_OBJS, genSalt }
