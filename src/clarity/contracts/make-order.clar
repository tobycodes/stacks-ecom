;; make-order
;; <create an order>

;; public functions
(define-public (make-order (amount uint) (customer principal))
  (begin 
    (unwrap-panic (stx-burn? amount customer))
    (ok true)
  )
)