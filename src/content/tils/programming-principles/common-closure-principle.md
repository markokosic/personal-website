---
date: 2026-01-14
---

# Common Closure Principle (CCP)

Definition: The Common Closure Principle states that components that change for the same reason should be grouped together. Each module or component should be closed for changes except when the reason for change affects it. This principle helps isolate changes, reduce side effects, and improve maintainability.

**Key Idea**

- If a requirement changes, only one component/module should be affected.
- Components should not mix responsibilities that might change for different reasons.

```js
function ProductList({ products }) {
  return (
    <div>
      {products.map((p) => (
        <div key={p.id}>
          <h2>{p.name}</h2>
          <p>Price: {p.price}</p>
          <button onClick={() => console.log('Add to cart')}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}
```

```js
function Price({ price }) {
  return <p>Price: {price.toFixed(2)} €</p>;
}

function ProductItem({ product, onAddToCart }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <Price price={product.price} />
      <button onClick={() => onAddToCart(product)}>Add to cart</button>
    </div>
  );
}

function ProductList({ products, onAddToCart }) {
  return (
    <div>
      {products.map((p) => (
        <ProductItem key={p.id} product={p} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
```
