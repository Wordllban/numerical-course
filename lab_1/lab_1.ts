type TMatrix = any[][];

let V: TMatrix = [],
  P: number[] = [],
  Y: number[] = [],
  X: number[] = [],
  C: TMatrix = [],
  inverse: TMatrix = [];

const k = 9;
const s = 0.02 * k;
const testMatrix = [
  [8.3, 2.62 + s, 4.1, 1.9],
  [3.92, 8.45, 7.78 - s, 2.46],
  [3.77, 7.21 + s, 8.04, 2.28],
  [2.21, 3.65 - s, 1.69, 6.69],
];

function Gaussin(matrix: number[][] = testMatrix) {
  const N = matrix?.length || testMatrix.length;
  const E = createUnitMatrix(N);

  gaussinMethod(matrix, E, N);

  console.log("Matrix: ");
  console.table(matrix);

  console.log("Result: ");
  console.table(inverse);

  console.log("Check: ");
  console.table(multiplyMatrices(testMatrix, inverse));
}

function createUnitMatrix(matrixLength: number) {
  let E: TMatrix = [];
  for (let i = 0; i < matrixLength; i++) {
    for (let j = 0; j < matrixLength; j++) {
      if (!E[i]) {
        E[i] = [];
      }
      if (i == j) {
        E[i][j] = 1;
      } else {
        E[i][j] = 0;
      }
    }
  }

  return E;
}

function copyMatrix(A: TMatrix, E: TMatrix, b: number, matrixLength: number) {
  for (let i = 0; i < matrixLength; i++) {
    for (let j = 0; j < matrixLength; j++) {
      if (!V[i]) {
        V[i] = [];
      }

      V[i][j] = A[i][j];
      P[i] = E[i][b];
    }
  }
}

function copyYtoX(matrixLength: number) {
  for (let n = 0; n < matrixLength; n++) {
    X[n] = Y[n];
  }
}

function gaussinMethod(A: TMatrix, E: TMatrix, matrixLength: number) {
  for (let b = 0; b < matrixLength; b++) {
    copyMatrix(A, E, b, matrixLength);
    for (let k = 0; k < matrixLength; k++) {
      Y[k] = P[k] / V[k][k];
      for (let i = k + 1; i < matrixLength; i++) {
        P[i] = P[i] - V[i][k] * Y[k];
        for (let j = k + 1; j < matrixLength; j++) {
          if (!C[k]) {
            C[k] = [];
          }
          C[k][j] = V[k][j] / V[k][k];
          V[i][j] = V[i][j] - V[i][k] * C[k][j];
        }
      }
    }

    copyYtoX(matrixLength);

    for (let i = matrixLength - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < matrixLength; j++) {
        sum += C[i][j] * X[j];
      }
      X[i] = Y[i] - sum;
    }
    for (let i = 0; i < matrixLength; i++) {
      if (!inverse[i]) {
        inverse[i] = [];
      }
      inverse[i][b] = X[i];
    }
  }
}

function checkInverse(
  matrix: TMatrix = testMatrix,
  matrixLength: number = testMatrix.length
) {
  let checkMatrix: TMatrix = [];
  for (let i = 0; i < matrixLength; i++) {
    if (!checkMatrix[i]) {
      checkMatrix[i] = [];
    }
    for (let j = 0; j < matrixLength; j++) {
      checkMatrix[i][j] = matrix[i][j] * inverse[i][j];
    }
  }
}

function multiplyMatrices(m1: TMatrix, m2: TMatrix) {
  let result = [];
  for (let i = 0; i < m1.length; i++) {
    if (!result[i]) {
      result[i] = [];
    }
    for (let j = 0; j < m2[0].length; j++) {
      result[i][j] = 0;
      for (let k = 0; k < m1[0].length; k++) {
        result[i][j] += Math.round(m1[i][k] * m2[k][j] * 10000) / 10000;
      }
      result[i][j] = Math.round(result[i][j]); // round to integers
    }
  }

  return result;
}

Gaussin()