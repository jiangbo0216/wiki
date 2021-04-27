# [Full-rank square matrix is invertible](https://sharmaeklavya2.github.io/theoremdep/)

利用线性方程组的知识, $AX=0$, 左乘A的逆矩阵, 推出只有零解, 所以线性无关, 即满秩

## Dependencies

1. [Rank of a matrix](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/rank.html)
2. [RREF is unique](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/unique-rref.html)
3. [Inverse of a matrix](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/inverse.html)
4. [Rank of a homogenous system of linear equations](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/system-of-linear-equations/rank-homogenous.html)
5. [Matrix multiplication is associative](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/mult-assoc.html)
6. [Row equivalence matrix](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/row-equiv-matrix.html)
7. [Full-rank square matrix in RREF is the identity matrix](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/full-rank-square-rref-is-identity.html)

Let $A$ be an $n$ by $n$ matrix. Then $rank(A)=n$ iff $A$ has an inverse.

## Proof of 'if' part

Let $A$ have an inverse $B$. Then $AB=BA=I_n$.

$AX=0$ is a homogeneous system of $n$ linear equations in n variables.

$$AX=0⟹B(AX)=B0⟹(BA)X=0⟹InX=0⟹X=0$$
Therefore,$X=0$ is the only solution to $AX=0$. Therefore, $rank(A)=n$.

## Proof of 'only-if' part

Let $rank(A)=n$.

Since $RREF(A)$ is row-equivalent to $A$, $RREF(A)=RA$, where $R$ is an invertible matrix.

Since $rank(A)=n$, all rows of $RREF(A)=RA$ are non-zero. Since $RA$ is a square matrix in $RREF$, $RA=I_n$. Since $R$ is invertible, all left inverses of $R$ are the same as all right inverses of $R$. Since $A$ is a right inverse of $R$, it is also a left inverse. Therefore, AR=In=RA, so $A$ is invertible.

## Dependency for

1. [Multivariate normal distribution](https://sharmaeklavya2.github.io/theoremdep/nodes/probability/normal-distr/multivariate.html)
2. [A is diagonalizable iff there are n linearly independent eigenvectors](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/eigenvectors/diag-linindep.html)
3. [RREF([A|I\]) = [I|inv(A)] iff A is invertible](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/rref-inv.html)
4. [AB = I implies BA = I](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/product-equals-identity-implies-invertible.html)
5. [Determinant of product is product of determinants](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/determinants/product.html)

## Info

- Depth: 10
- Number of transitive dependencies: 30

## Transitive dependencies

1. /linear-algebra/matrices/gauss-jordan-algo
2. /sets-and-relations/equivalence-relation
3. [Group](https://sharmaeklavya2.github.io/theoremdep/nodes/abstract-algebra/groups/group.html)
4. [Ring](https://sharmaeklavya2.github.io/theoremdep/nodes/abstract-algebra/rings/ring.html)
5. [Polynomial](https://sharmaeklavya2.github.io/theoremdep/nodes/polynomials/polynomial.html)
6. [Integral Domain](https://sharmaeklavya2.github.io/theoremdep/nodes/abstract-algebra/rings/intdom.html)
7. [Comparing coefficients of a polynomial with disjoint variables](https://sharmaeklavya2.github.io/theoremdep/nodes/polynomials/compare-coeff-disjoint-var.html)
8. [Field](https://sharmaeklavya2.github.io/theoremdep/nodes/abstract-algebra/rings/field.html)
9. [Semiring](https://sharmaeklavya2.github.io/theoremdep/nodes/abstract-algebra/semiring.html)
10. [Matrix](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/matrix.html)
11. [Stacking](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/stacking/stacking.html)
12. [System of linear equations](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/system-of-linear-equations/system-of-linear-equations.html)
13. [Product of stacked matrices](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/stacking/product.html)
14. [Matrix multiplication is associative](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/mult-assoc.html)
15. [Reduced Row Echelon Form (RREF)](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/rref.html)
16. [Identity matrix](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/identity.html)
17. [Inverse of a matrix](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/inverse.html)
18. [Inverse of product](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/inverse-of-product.html)
19. [Full-rank square matrix in RREF is the identity matrix](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/full-rank-square-rref-is-identity.html)
20. [Row space](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/row-space.html)
21. [Elementary row operation](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/elementary-rowop.html)
22. [Every elementary row operation has a unique inverse](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/elementary-rowop-inv.html)
23. [Elementary row operation is matrix pre-multiplication](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/elementary-rowop-matrix.html)
24. [Row equivalence of matrices](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/row-equiv.html)
25. [Row equivalent matrices have the same row space](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/row-equiv-matrices-have-same-row-space.html)
26. [RREF is unique](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/unique-rref.html)
27. [Rank of a matrix](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/rank.html)
28. [Row equivalence matrix](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/matrices/row-equiv-matrix.html)
29. [Equations with row equivalent matrices have the same solution set](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/system-of-linear-equations/row-equiv-have-same-solutions.html)
30. [Rank of a homogenous system of linear equations](https://sharmaeklavya2.github.io/theoremdep/nodes/linear-algebra/system-of-linear-equations/rank-homogenous.html)
