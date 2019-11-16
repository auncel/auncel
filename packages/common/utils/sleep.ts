/**
 * 让函数「睡眠」
 * @param {number} ms 睡眠时间
 */
export default function sleep (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}