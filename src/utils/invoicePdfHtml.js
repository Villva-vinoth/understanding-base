const generateInvoice = (data) =>{
  const orderId = data.order_invoices.order_id;
    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleTimeString();
    const total = data.order_invoices.amount;
    const tax = Math.round(total) * (18 / 100);
    const grandTotal = Math.round(total) + tax;
    const name = data.user_invoices.full_name;
    const address =
    data.order_invoices.ordered_address || "madurai";
    const phone =data.user_invoices.phone || "1234567890";
    const invoice_id = data.invoice_id;
    const orderStatus = "completed";
    const paymentStatus = "paid";
    const paymentMethod = "online";
    const paymentId = "1234";
    const products = data.order_invoices.items;
    let html= `<!DOCTYPE html>
          <html lang="en">
      <head>
       <title>Invoice</title>
 
      </head>
  <body>
      <div class="flex justify-evenly bg-[blue]">
          <div class="text-center my-5 text-[white] w-[80%]">Invoice For Your Order ${orderId}</div>
          <div class="text-center flex flex-col justify-evenly test-[white]">
              <div class="text-white">Date : ${date}</div>
              <div class="text-white">Time : ${time}</div>
          </div>
      </div>
<section class="flex flex-col justify-evenly">
      <table class="table-fixed border-collapse border border-spacing-2 border-slate-500 text-center w-[80%] mx-auto my-5 ">
          <thead>
              <tr class="border border-slate-600 bg-[blue] text-[white]">
                  <th scope="col" class="border border-slate-500">Product</th>
                  <th scope="col" class="border border-slate-500">Quantity</th>
              </tr>
          </thead>
          <tbody > 
          `;

    html += `
      ${products
        .map(
          (product) => ` 
          <tr class="hover:bg-slate-100 ">
              <td class="border border-slate-500">${product.product_id}</td>
              <td class="border border-slate-500">${product.quantity}</td>
          </tr>
           `
        )
        .join("")} 
           `;

      html += `
         
              <tr class="text-end ">
                  <td>Total</td>
                  <td class="text-[green]">${total}</td>
              </tr>
              <tr class="text-end ">
                  <td>Tax</td>
                  <td class="text-[green]">${tax}</td>
              </tr>
              </tbody>
      
      </table>

      <section class="w-[80%] mx-auto flex justify-between my-5 ">
          <div>
              <div class="w-[70%] h-[2px] bg-[blue] mb-5"></div>
                  <div> invoice : ${invoice_id}</div>
                  <div> Recipient : ${name}</div>
                  <div> Address : ${address}</div>
                  <div> Phone : ${phone}</div>
              </div>

              <div class="flex justify-between gap-5 ">
                  <div class="mb-5">
                      <div> Order Id : ${orderId}</div>
                      <div> Order Date : ${date}</div>
                      <div> Order Time : ${time}</div>
                      <div> Order Status : ${orderStatus}</div>
                      <div> Payment Status : ${paymentStatus}</div>
                  </div>
                  <div class="mb-5">
                      <div> Payment Method : ${paymentMethod}</div>
                      <div> Payment Id : ${paymentId}</div>
                      <div> Total : ${total}</div>
                      <div> Tax : ${tax}</div>
                      <div> Grand Total : ${grandTotal}</div>
                  </div>
              </div>
      </section>
          </section>
  </body>
  <script src="https://cdn.tailwindcss.com"></script>
  </html>`;
    return html
}

module.exports = { generateInvoice}