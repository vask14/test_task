function applyCode(code) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    const url = "https://www.cufflinks.com/onestepcheckout/checkout/couponPost/";
    formData.append("coupon_code",code);
    formData.append("remove",0);
    xhr.open('POST',url,true);
    xhr.onerror = function() {
        reject(console.log(error));
    };
    xhr.onreadystatechange = function() {
     if (this.readyState != 4) return;
     if (this.status != 200) {
       console.log( 'error: ' + (this.status ? this.statusText : 'request failed') );
       return;
   }
     console.log(JSON.parse(this.responseText));
 }
    xhr.send(formData);
}
applyCode('STYLENOW');

let startTotal;
let finalTotal;
let discount;
startTotal = parseHTML();
function parseHTML(response) {
    discount = document.querySelector('tfoot tr:nth-child(2) td:nth-child(2)').innerText.match(/[0-9]+\.[0-9]{2}/)[0]
    if(response === undefined) {
       startTotal = document.querySelector('tfoot tr.first td.a-right.last').innerText.match(/[0-9]+\.[0-9]{2}/)[0];
       return startTotal;
    }
    else {
        finalTotal = document.querySelector('tfoot tr.last td.a-right.last').innerText.match(/[0-9]+\.[0-9]{2}/)[0];
        return finalTotal;
    }
}

function applyCode(code) {
  const params = new URLSearchParams();
  params.set('remove', 0);
  params.set('coupon_code', code);
  
  return fetch('https://www.cufflinks.com/onestepcheckout/checkout/couponPost/' , {
    method: "POST",
    credentials: "include",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    },
    body: params
  })
  .then(response => response.text())
}


applyCode('STYLENOW')
.then(response => {
    console.log(response)
    finalTotal = parseHTML(response);
    console.log('originPrice',startTotal);
    console.log('finalPrice',finalTotal);
    console.log('discount',discount);
});



function removeCode(code) {
    const params = new URLSearchParams();
    params.set('remove', 1);
    params.set('coupon_code', '');
    return fetch('https://www.cufflinks.com/onestepcheckout/checkout/couponPost/' , {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
        },
        body: params
    })
    .then(response => response.text());
}
removeCode('STYLENOW');