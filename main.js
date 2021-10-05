var app = new Vue(
    {
        el:"#app",
        data:{
            product:"Airforce 23 low Cut boot",
            image:"./assets/img/airforce Black.jpeg",
            inventory: 9,
            cart: 0,
            details:["Pure Leather","Water-Proof","Rubber Sole","Wipe-off"],
            variants:[
                {
                variantId: 123,
                variantImage:"./assets/img/airforceBlue.jpg",
                variantColor:"Blue"
            },
            {
                variantId: 456,
                variantImage:"./assets/img/airforceWhite.jpeg",
                variantColor:"White"
            },
            {
                variantId: 789,
                variantImage:"./assets/img/airforce Black.jpeg",
                variantColor:"Black"
            }
            ]
            },
        methods:{
                addToCart: function(){
                    this.cart += 1
                },
                updateProduct: function(variantImage){
                    this.image = variantImage
                }
            }
    }
);
