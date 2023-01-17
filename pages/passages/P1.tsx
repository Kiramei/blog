/* eslint-disable react/no-children-prop */
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Card } from "antd"
import { useRouter } from "next/router"
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import CodeBlock from "../../components/CodeBlock"
import styles from '../../styles/Home.module.css'
import 'katex/dist/katex.min.css'

const Passage = () => {
  const codeTest =
`namespace Problem1
{
    /**
     * 普通生成函数应用1
     * 给定n个物品，第i物品选购个数范围是[ai,bi]
     * 求买m个物品的方案数
     * 输入顺序:n,m,a1,b1...an,bn
     * 输入 3 6 2 3 0 2 1 2
     * 输出 3
     */
    const int MAXN = 110;
    int a[MAXN], b[MAXN], c[MAXN], d[MAXN << 1];
    int n, m;
    void solution()
    {
        cin >> n >> m;
        rep(i, 1, n) cin >> a[i] >> b[i];
        //对第一个多项式系数赋初值为1
        rep(i, a[1], b[1]) c[i] = 1;
        rep(i, 2, n)
        {
            //模拟多项式乘法操作，辅助数组d记录本次卷积结果
            rep(j, 0, m) rep(k, a[i], b[i]) d[j + k] += c[j];
            //将d的结果赋给c，重置d
            rep(j, 0, m) c[j] = d[j], d[j] = 0;
        }
        //第m项就是要求的组合数
        cout << c[m];
    }
}

namespace Problem2
{
    /**
     * 普通生成函数应用2
     * 有n种硬币
     * 面值为a1,a2,...an的硬币有b1,b2,...bn枚
     * 求不能由这些硬币构成的最小面值
     * 输入顺序n,a1,b1,a2,b2,...an,bn
     * 输入:3 1 1 2 1 5 1
     * 输出:4
     */
    const int MAXN = 4e3 + 5;
    int a[MAXN], b[MAXN], c[MAXN], d[MAXN << 1];
    int n, m, ans, rec;
    void solution()
    {
        cin >> n;
        rep(i, 1, n) cin >> a[i] >> b[i];
        //由于硬币面值问题，指数迭代数须改变
        rep_i(i, 0, a[1] * b[1], a[1]) c[i] = 1;
        rep(i, 2, n)
        {
            rec += a[i - 1];
            //迭代求取后续生成函数的系数，注意指数的变化
            rep_i(k, 0, a[i] * b[i], a[i]) rep(j, 0, rec) d[j + k] += c[j];
            rep(j, 0, a[i] * b[i] + a[i - 1] * b[i - 1]) c[j] = d[j], d[j] = 0;
        }
        //枚举最小不能被表示的数，若c[ans]=0，说明不能被表示
        while (c[++ans]);
        cout << ans;
    }
}

void solve()
{
    // Problem1::solution();
    // Problem2::solution();
}`

const text=
`### 为了解决给定多个个数区间和组合个数下的组合种类问题，我们需要用到生成函数
 ### 序列的生成函数是一种形式幂级数，系数可以包含序列信息
 ### 对于序列$a_n$的普通生成函数: $ F(x)=\\sum_{n>=0}{a_nx^n} $,其每一项前的系数代表组合数，指数代表取几个物品
 ### 普通生成函数可以做加减运算，即同次项系数加减；可以做卷积运算，即多项式乘法
 ### 下面通过案例来应用普通生成函数
 `

  const router = useRouter();
  return <div style={{
    paddingTop: '1vh',
    paddingLeft: 25,
    paddingRight: 25,
    height: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'auto',
    overflowX: 'hidden',
  }}
  >

    <div>
      <div style={{
        height: '100%'
      }}>
        <Card className={styles.cardItem} style={{
          padding: '3vw 3vw 0 3vw'
        }}
          title={<h1 style={{ textAlign: 'center' }}>普通生成函数的应用</h1>}
        >
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            children={text} />
          <CodeBlock textContent={codeTest} language='cpp' />
          <div style={{ fontSize: '25px', lineHeight: '50px', width: '100%', height: 50, display: 'flex', justifyContent: 'center' }}>
            <div className={styles.motoru} onClick={() => router.push('/')}>
              <ArrowLeftOutlined />
              <span style={{ marginTop: '-3px' }}>返回</span>
            </div>
          </div>
        </Card>
      </div>
      <div style={{ width: '100%', height: 1000 }}></div>
    </div>
  </div>
}
export default Passage