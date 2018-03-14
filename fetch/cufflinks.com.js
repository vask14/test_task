const codes = ['STYLENOW','SHOPNOW','GENIECODE1','GENIECODE2','GENIECODE3'];

Promise.each = function(arr, fn) {
    if(!Array.isArray(arr)) return Promise.reject(new Error("Non array passed to each"));
    if(arr.length === 0) return Promise.resolve(); 
    return arr.reduce(function(prev, cur) { 
      return prev.then(() => fn(cur))
    }, Promise.resolve());
  }

function checkCodes(codes) {
    getExistingCodes();
    const originalPrice = parseFloat(document.querySelector('tfoot tr.last td.a-right.last').innerText.match(/[0-9]+\.[0-9]{2}/)[0]).toFixed(2);
    console.log(originalPrice);
    return Promise.each(codes,code => {
        return applyCode(code)
        .then(response => {
            console.log(response);
            const finalPrice = response.match(/[-]{0,1}[\d]*[\.]{0,1}[\d]+/g)[18];
            const finalDiscount = originalPrice - finalPrice
            console.log(finalPrice,'Final Price');
            console.log(finalDiscount.toFixed(2),'Final Discount');
            return removeCode(code)
            .then(() => {
                return Promise.resolve();
            });
        });
    });
    console.log(codes);
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
    });
}

function getExistingCodes() {
    const codes = Array.from(document.querySelectorAll('tfoot tr:nth-child(2) td.a-right:first-child'));
    console.log(codes);
    return {
        codes: codes,
        codeCount: codes.length
    }
}

checkCodes(codes);