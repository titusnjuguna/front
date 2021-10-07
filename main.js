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
                <hr/>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews</p>
                <ul> <li v-for="review in reviews"> 
                        <p>{{review.name}}</p>
                        <p>{{review.rating}}</p>
                        <p> {{review.Review}} </p>

                    </li>
                    
                    
                    
                </ul>
                <hr/>
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
            ],
            reviews : []
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
                    this.reviews.push(product_review)
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
  <p v-if="errors.length">
  <b> Please Check the following:</b>
  <ul> 
    <li v-for="error in errors">{{error}}</li>
  </ul>
  </p>

    <label for="fname">Customer Name</label>
    <input type="text" id="fname" name="name" placeholder="Your name.." v-model="name">
    <p>
    <label for="lname">Review</label>
    </p>
    
    <textArea v-model="review"></textArea>
   <p>
    <label for="rating">Rating</label>
    </p>
    <select id="country" name="rating" v-model.number="rating">
      <option >1</option>
      <option >2</option>
      <option >3</option>
      <option >4</option>
      <option >5</option>
    </select>
   
  <p>
    <input type="submit" value="Submit">
  </p>  
  </form>
</div>

        `
    ,
    data(){
        return{
            name:null,
            review: null,
            rating: null,
            errors : []

        }
        
    },
    methods:{
        onSubmit(){
            if (this.name && this.review && this.rating){
                let product_review = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submitted',product_review)
            this.name = null
            this.review = null
            this.rating = null

            }else{
                if(!this.name)this.errors.push('Name is Required')
                if(!this.review)this.errors.push('Review is Required')
                if(!this.rating)this.errors.push('Rating is Required')
                
            }
            
             
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
