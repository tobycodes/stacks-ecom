;; make-order
;; <create an order>

;; variables and constants
(define-constant ERR_PAYMENT_FAILED u400)
(define-constant ERR_NOT_AUTHORIZED u403)
(define-constant ERR_CART_ALREADY_PAID u406)
(define-constant ERR_CART_NOT_FOUND u404)
(define-constant ERR_TRANSACTION_LIST_FULL u422)
(define-constant orders-list-key "orders-list")
(define-constant orders-list-max-length u10000)
(define-map transactions-map { cart-id: (string-ascii 255) } { amount: uint })
(define-map orders-list-map { all-orders: (string-ascii 255) } { orders: (list orders-list-max-length uint) })

;; public functions
(define-read-only (get-transaction (cart-id (string-ascii 255)))
  (let ((amount (unwrap! (map-get? transactions-map {cart-id: cart-id}) (err ERR_CART_NOT_FOUND))))
    (ok amount)
  )
)

(define-read-only (get-transactions)
  (let ((all-orders 
    (default-to 
      (list) 
      (get orders (map-get? orders-list-map { all-orders: orders-list-key }))
    )))
    (ok all-orders)
  )
)

(define-public (init-order (cart-id (string-ascii 255)) (amount uint))
  (let ((customer tx-sender))
    ;; check if user calling the function is the owner of the cart
    (asserts! (is-eq customer contract-caller) (err ERR_NOT_AUTHORIZED))
    ;; check if cart is already paid
    (asserts! (is-none (map-get? transactions-map {cart-id: cart-id})) (err ERR_CART_ALREADY_PAID))
    ;; create a new transaction
    (unwrap! (as-contract (stx-transfer? amount customer tx-sender)) (err ERR_PAYMENT_FAILED))
    ;; save the transaction to the map
    (map-insert transactions-map {cart-id: cart-id} {amount: amount})
    (as-max-len? (append (get pilots (map-get? orders-list-map { all-orders: orders-list-key })) cart-id) orders-list-max-length)
    ;; return `true` response
    (ok true)
  )
)
