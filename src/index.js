import './index.scss';
console.log('Hello. Excel!');

async function wait() {
  return await Promise.resolve('async working');
}
wait().then(console.log);
