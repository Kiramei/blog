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
  const code =
    `//万能头文件，包含了stl，输入输出等等一系列实用库
  //但有一些老版编译器不能通过，还需事先调查
  #include <bits/stdc++.h>
  //输入输出解除cin、cout与printf和scanf的绑定，加快了读写速度
  #define IOS                  \\
      ios::sync_with_stdio(0); \\
      cin.tie(0), cout.tie(0);
  //循环可以用预处理的方式，简化for在定义时的复杂
  //register int是寄存器变量类型，可以加快for循环迭代速度
  //rep是从小到大循环，rep_r是从大到小循环，切记在for循环条件复杂时勿用rep
  #define rep(i, s, t) for (register int i = (s); i <= (t); i++)
  #define rep_r(i, s, t) for (register int i = (s); i >= (t); i--)
  //找两个数的最大值
  #define max(a, b) (a > b ? a : b)
  //找两个数的最小值
  #define min(a, b) (a < b ? a : b)
  //虽然c++自带了std::endl但速度要比输出'\n'慢
  #define endl '\\n'
  //预定义较长类型名
  typedef long long ll;
  typedef unsigned long long ull;
  typedef double db;
  //使用std命名空间，方便快速写码
  using namespace std;
  //求最大公约数->辗转相除
  ll gcd(ll a, ll b) { return b ? gcd(b, a % b) : a; }
  //多个样例可以使用
  #define caseT \\
      int T;    \\
      cin >> T; \\
      while (T--)
  //题目的解决方案写在这里
  void solve()
  {
  }
  int main()
  {
      IOS;//快读快写
      //大部分oj都定义了ONLINE_JUDGE，运用这个性质可以方便文件调试
      #ifndef ONLINE_JUDGE
      //记录程序开始时间，方便查询算法复杂度是否正确
      clock_t my_clock = clock();
      //文件重定向，与文件相同的目录下，1.in 表示输入 1.out 表示输出
      freopen("1.in", "r", stdin);
      freopen("1.out", "w", stdout);
      #endif
      solve();
      #ifndef ONLINE_JUDGE
      //输出程序执行时间
      cout << endl << "Time used " << clock() - my_clock << " ms." << endl;
      #endif
      return 0;
    }`
  const text=`
  *  在写算法题的时候经常会用到一些系统内部定义的一些符号，它们又长又复杂，
  *  这时候我们就可以对其预定义我们喜好的符号，简短又易懂。
  *  对于一些题目定死的数据范围，通常在开数组的时候可以调用之前预定义的范围
  *  对于一些简易的算法，我们也可以预先写在自己的文件头里，方便后续调用
  *  具体的内容在代码当中有注释
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
          title={<h1 style={{ textAlign: 'center' }}>基本的预定义</h1>}
        >
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            children={text} />
          <CodeBlock textContent={code} language='cpp' />
          <div style={{ fontSize: '25px', lineHeight: '50px', width: '100%', height: 50, display: 'flex', justifyContent: 'center' }}>
            <div className={styles.motoru} onClick={() => router.push('/')}>
              <ArrowLeftOutlined />
              <span style={{ marginTop: '-3px' }}>返回</span>
            </div>
          </div>
        </Card>
      </div>
      <div style={{ width: '100%', height: 700 }}></div>
    </div>
  </div>
}
export default Passage