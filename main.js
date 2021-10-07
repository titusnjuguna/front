Vue.component('product',{
    props:{
        premium:{
            type: Boolean,
            required: true
        }

    },
    template: 
    `
    <div class="product">
                <div class="product-image">
                    <img v-bind:src="image"style="width:100%">
                </div>
                <div class="product-info">
                    <h5>{{title}}</h5>
                    <p v-if="inventory > 10">Instock</p>
                    <p v-else-if ="inventory <= 10 && inventory > 0 ">Almost Sold Out</p>
                    <p v-else
                        
                       style="text-decoration:line-through;">Out of stock</p>
                    <p>Shipping: {{shipping}} </p>  
                    <ul>
                        <li v-for="detail in details">{{detail}}</li>
                    </ul>
                    <div v-for="(variant,index) in variants"
                    :key="variant.variantId" 
                    style="display:inline-block;">
                      <p @mouseover="updateProduct(index)"
                         
                       style="padding: 5px 20px;cursor: pointer;border: 2px solid #000;margin-left: 7px;margin-bottom: 8px;">  {{variant.variantColor}} </p>
                    </div>
                </div>
                <button v-on:click="addToCart" :disabled="!inventory">Add To Cart</button>
                <product_Review @review-submitted="addReview"></product_Review>
                
                </div>`,
        
     data(){
         return {
            brand:"Nike",
            name:"Airforce 23 low Cut boot",
            selectedVariant: 0,
            details:["Pure Leather","Water-Proof","Rubber Sole","Wipe-off"],
            variants:[
                {
                variantId: 123,
                variantImage:"./assets/img/airforceBlue.jpg",
                variantColor:"Blue",
                variantQuantity: 5
            },
            {
                variantId: 456,
                variantImage:"./assets/img/airforceWhite.jpeg",
                variantColor:"White",
                variantQuantity: 15
            },
            {
                variantId: 789,
                variantImage:"./assets/img/airforce Black.jpeg",
                variantColor:"Black",
                variantQuantity: 0
            }
            ]
            }
     },
    methods:{
                addToCart(){
                    return this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId)
                },
                updateProduct: function(index){
                    this.selectedVariant = index
                },
                addReview(product_review){
                    th
                }
            },
    computed:{
            title(){
                return this.brand + " " + this.name
            },
            image(){
                return this.variants[this.selectedVariant].variantImage
            },
            inventory(){
                return this.variants[this.selectedVariant].variantQuantity
            },
            shipping(){
                if(this.premium){
                    return "Free"
                }else{
                    return "2.99"
                }
            }
        }            

    
}
),
Vue.component('product_Review',{
    template:
    `
        <div>
  <form action="/action_page.php" @submit.prevent="onSubmit">
    <label for="fname">Customer Name</label>
    <input type="text" id="fname" name="name" placeholder="Your name.." v-model="name">

    <label for="lname">Review</label>
    <textArea v-model="review"></textArea>
    

    <label for="rating">Rating</label>
    <select id="country" name="rating" v-model.number="rating">
      <option >1</option>
      <option >2</option>
      <option >3</option>
      <option >4</option>
      <option >5</option>
    </select>
  
    <input type="submit" value="Submit">
  </form>
</div>

        `
    ,
    data(){
        return{
            name:null,
            review: null,
            rating: null

        }
    },
    methods:{
        onSubmit(){
            let product_review = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submitted',product_review)
            this.name = null
            this.review  = null
            this.rating  = null
             
        }
    }
})
var app = new Vue(
    {
        el:"#app",
        data:{
            premium: true,
            cart: []
        },
        methods:{
            updateCart(id){
                return this.cart.push(id) 
            },
         
        }
   
    }
);
