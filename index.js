const positionList = ['intern', 'fresher', 'junior', 'senior'];
let name = '';
let phone = '';
let position = 'intern';
let exp = '';
let picture = '';
let email = '';

const handleChange = (event) => {
  const files = event.target.files;
  if (files != null && files[0] != null) {
    picture = files[0].name;
  }
}

const validateName = (nameArg) => {
  return /^([\p{Lu}]|([\p{Lu}][\p{Ll}]{1,8}))(\s([\p{Lu}]|[\p{Lu}][\p{Ll}]{1,10})){0,5}$/u.test(nameArg);
}

const validatePhone = (phoneArg) => {
  return /^(0|84){1}[0-9]{9,11}$/.test(phoneArg);
}

const validateEmail = (emailArg) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailArg);
}

const validatePosition = (positionArg) => {
  return positionList.find(e => e === positionArg) != null;
}

$('#position').change(function () {
  position = $(this).val();
});

$('.text').keyup(function () {
  let isValid = false;
  switch ($(this)[0].name) {
    case 'name':
      isValid = validateName($(this).val());
      if (isValid) {
        name = $(this).val();
      } else {
        name = '';
      }
      break;
    case 'phone':
      isValid = validatePhone($(this).val());
      if (isValid) {
        phone = $(this).val();
      } else {
        phone = '';
      }
      break;
    case 'exp':
      isValid = $(this).val() !== '';
      if (isValid) {
        exp = $(this).val();
      } else {
        exp = '';
      }
      break;
    case 'email':
      isValid = validateEmail($(this).val());
      if (isValid) {
        email = $(this).val();
      } else {
        email = '';
      }
      break;
  }
  if (isValid) {
    if ($(this).hasClass('is-invalid')) {
      $(this).removeClass('is-invalid');
    }
    $(this).addClass('is-valid');
  }
  if (!isValid) {
    if ($(this).hasClass('is-valid')) {
      $(this).removeClass('is-valid');
    }
    $(this).addClass('is-invalid');
  }
});

$('#form').submit((e) => {
  e.preventDefault();
  let isFormValid = true;
  if (!validateName(name) || !validatePhone(phone) || exp === '' || !validateEmail(email) || picture === '' || !validatePosition(position)) {
    isFormValid = false;
  }
  if (picture === '') {
    const h = '<div class="text-danger">Vui lòng chọn hình ảnh!</div>';
    $('#picture-warn').html(h);
  } else {
    $('#picture-warn').html('');
  }
  if (isFormValid) {
    const e = {
      name,
      phone,
      exp,
      position,
      picture,
      email
    };
    $.ajax({
      url: "https://freemind-test.netlify.app/.netlify/functions/test",
      type: "POST",
      data: JSON.stringify(e),
      contentType: "application/json",
      success: function () {
        const h = '<div class="text-success"> Đã gửi CV thành công! </div>';
        $('#success').html(h);
      }
    });
  }
});