;; make-order
;; <create an order>
;; The purpose of this contract is to process cart payments on the blockchain and keep records of all the transactions happening.
;; In order to achieve this, we are defining two maps (should really be one but I don't know how to work with lists yet)
;; The first map is a map of all paid transactions and their total amount (to be improved upon for sure)
;; The second map simply holds a list of all transactions (so it is easy to query the entire list, again because I don't know how to work with lists/maps really well yet)
;; So we make transfer, add cart id to first and second map, and we return success

;; variables and constants
(define-constant ERR_PAYMENT_FAILED u400)
(define-constant ERR_NOT_AUTHORIZED u403)
(define-constant ERR_CART_ALREADY_PAID u406)
(define-constant ERR_CART_NOT_FOUND u404)
(define-constant ERR_TRANSACTION_LIST_FULL u422)
(define-constant orders-list-key "orders-list")
(define-constant orders-list-max-length u10000)
(define-map transactions-map { cart-id: (string-ascii 255) } { amount: uint, paid: bool })
(define-map orders-list-map { all-orders: (string-ascii 255) } { orders: list 10000 (tuple (id (string-ascii 500)) (paid bool) (amount uint)) }))

;; public functions
(define-read-only (get-transaction (cart-id (string-ascii 255)))
  (let ((trx (unwrap! (map-get? transactions-map {cart-id: cart-id}) (err ERR_CART_NOT_FOUND))))
    (ok trx)
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
  (begin
    ;; check if user calling the function is the owner of the cart
    (asserts! (is-eq tx-sender contract-caller) (err ERR_NOT_AUTHORIZED))
    ;; check if cart is already paid
    (asserts! (is-none (map-get? transactions-map {cart-id: cart-id})) (err ERR_CART_ALREADY_PAID))
    (print tx-sender)
    (print (as-contract tx-sender))
    ;; create a new transaction
    (unwrap! (stx-transfer? amount tx-sender (as-contract tx-sender)) (err ERR_PAYMENT_FAILED))
    ;; save the transaction to the map
    (map-insert transactions-map { cart-id: cart-id } { amount: amount, paid: true })
    (let ((all-orders 
      (default-to 
        (list) 
        (get orders (map-get? orders-list-map { all-orders: orders-list-key }))
      )))
      ;; add the new transaction to the list of all transactions
      (as-max-len? (append all-orders {amount: amount, paid: true, id: cart-id}) u10000)
      ;; update transactions list map
      (map-set orders-list-map { all-orders: orders-list-key } { orders: all-orders })
    )
    ;; return `true` response
    (ok true)
  )
)
